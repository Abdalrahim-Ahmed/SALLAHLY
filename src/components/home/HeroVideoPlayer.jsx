import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';

export default function HeroVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const current = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(current);
  };

  const handleSeek = (e) => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="hero-video-card" aria-label="فيديو تعريفي عن صلحلي">
      {/* Video Element with banner poster */}
      <video
        ref={videoRef}
        className="hero-video-frame"
        src="/videos/motion-1.mp4"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        playsInline
      />

      {/* Control Overlay */}
      <div
        className="hero-video-overlay"
        style={{
          background: isPlaying
            ? 'linear-gradient(180deg, rgba(4, 45, 124, 0.1) 0%, rgba(4, 45, 124, 0.7) 100%)'
            : 'linear-gradient(180deg, rgba(4, 45, 124, 0.3) 0%, rgba(4, 45, 124, 0.85) 100%)',
          pointerEvents: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="hero-video-badge">
            <Sparkles size={13} /> صلحلي في دقيقة
          </span>
          <span style={{ fontSize: '0.78rem', color: '#fff', opacity: 0.85, fontWeight: 600 }}>
            التجمع الخامس
          </span>
        </div>

        {/* Center Play / Pause trigger */}
        <button
          type="button"
          onClick={togglePlay}
          className="hero-video-play-btn"
          aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل الفيديو'}
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ transform: 'translateX(-2px)' }} />}
        </button>

        {/* Bottom smooth controls */}
        <div>
          {/* Progress bar */}
          <div
            onClick={handleSeek}
            style={{
              width: '100%',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '999px',
              cursor: 'pointer',
              marginBottom: '0.6rem',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'var(--primary)',
                borderRadius: '999px',
                transition: 'width 0.1s linear',
              }}
            />
          </div>

          <div className="hero-video-footer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={togglePlay}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }}
                aria-label={isPlaying ? 'إيقاف' : 'تشغيل'}
              >
                {isPlaying ? <Pause size={17} /> : <Play size={17} />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }}
                aria-label={isMuted ? 'إلغاء الكتم' : 'كتم الصوت'}
              >
                {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>
              <span style={{ fontSize: '0.78rem', opacity: 0.9 }}>
                {isPlaying ? 'جاري التشغيل' : 'شاهد كيف نصلح بيتك'}
              </span>
            </div>

            <button
              type="button"
              onClick={toggleFullscreen}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }}
              aria-label="ملء الشاشة"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
