import { useState, useEffect, useRef } from 'react';

const CameraComponent = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user'); // Начальное значение - фронтальная камера
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const enableStream = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode }, audio: true });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (error) {
                console.error('Ошибка доступа к камере/микрофону:', error);
            }
        };

        enableStream();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [facingMode]);

    const toggleFacingMode = () => {
        setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
    };

    return (
        <div className='container'>
            {stream && (
                <>
                    <video className='video' ref={videoRef} autoPlay playsInline controls />
                    <button className='button' onClick={toggleFacingMode}>Переключить камеру</button>
                </>
            )}
        </div>
    );
}

export default CameraComponent;

