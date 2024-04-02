import { useState, useEffect, useRef } from 'react';

export const CameraComponent = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<any>();

    useEffect(() => {
        const enableStream = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
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
    }, []);

    return (
        <div>
            {stream && <video ref={videoRef} autoPlay playsInline  />}
        </div>
    );
}
