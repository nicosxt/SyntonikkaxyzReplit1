import { useEffect, useRef } from 'react';
import { CreationParticles as Stage } from '@/lib/creationParticles';

/** Full-bleed particle layer for the hero. `scene` picks the arrangement. */
export default function CreationParticles({ scene, reducedMotion }: { scene: number; reducedMotion: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const stage = useRef<Stage | null>(null);
  const visible = useRef(true);
  const sceneRef = useRef(scene);
  sceneRef.current = scene;

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const instance = new Stage(el);
    stage.current = instance;
    instance.setScene(sceneRef.current);
    instance.resize();
    if (reducedMotion) instance.settle();

    const sync = () => {
      if (reducedMotion) return instance.stop();
      if (visible.current && !document.hidden) instance.start();
      else instance.stop();
    };
    const resizeObserver = new ResizeObserver(() => {
      instance.resize();
      if (reducedMotion) instance.settle();
    });
    resizeObserver.observe(el);
    const intersection = new IntersectionObserver(([entry]) => { visible.current = entry.isIntersecting; sync(); });
    intersection.observe(el);
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', sync);
      instance.destroy();
      stage.current = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    stage.current?.setScene(scene);
    if (reducedMotion) stage.current?.settle();
  }, [scene, reducedMotion]);

  return <canvas ref={canvas} className="creation-particles" aria-hidden="true" />;
}
