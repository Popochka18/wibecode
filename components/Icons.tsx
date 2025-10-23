import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const UserIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.095a1.23 1.23 0 00.41-1.412A9.99 9.99 0 0010 12c-2.31 0-4.438.784-6.131 2.095z" />
  </svg>
);

export const PhotoIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.19l-2.2-2.2a.75.75 0 00-1.06 0l-1.94 1.94-1.48-1.48a.75.75 0 00-1.06 0z" clipRule="evenodd" />
    <path d="M10 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);

// This icon represents "magic" or "generation"
export const WandIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M10.045 1.026a.75.75 0 01.756.756l-.375 2.25H12.9a.75.75 0 010 1.5h-2.575l-.375 2.25a.75.75 0 01-1.48-.248l.375-2.25H6.22a.75.75 0 010-1.5h2.575l.375-2.25a.75.75 0 01.725-.508zM8.51 6.31a.75.75 0 01.75-.75h.495a.75.75 0 00.654-.383l1.19-2.28a.75.75 0 011.318.687l-1.19 2.28a2.25 2.25 0 01-1.962 1.158h-.495a1.5 1.5 0 00-1.5 1.5v.328a.75.75 0 01-1.5 0v-.328a3 3 0 013-3.025zM12.828 8.672a.75.75 0 01.75-.75h.328a.75.75 0 010 1.5h-.328a.75.75 0 01-.75-.75zM11.75 10.5a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5zM9.182 13.172a.75.75 0 01.75-.75h.328a.75.75 0 010 1.5h-.328a.75.75 0 01-.75-.75zM5.04 15.207a.75.75 0 011.04-.207l1.8 1.04a.75.75 0 01-.75 1.299l-1.8-1.04a.75.75 0 01-.29-1.092zM15.953 11.04a.75.75 0 01.207 1.04l-1.04 1.8a.75.75 0 11-1.3-.75l1.04-1.8a.75.75 0 011.093-.29z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM3 14.25a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>
);

// This icon is for uploading files
export const UploadIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v8.59l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3.75A.75.75 0 0110 3zM3.75 13a.75.75 0 01.75.75v1.5c0 .414.336.75.75.75h9.5c.414 0 .75-.336.75-.75v-1.5a.75.75 0 011.5 0v1.5A2.25 2.25 0 0115.25 18h-9.5A2.25 2.25 0 013.5 15.75v-1.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
);

// This icon represents "magic" or AI enhancement
export const SparklesIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10.868 2.884c.321-.772 1.415-.772 1.736 0l1.681 4.048 4.458.649c.854.124 1.198 1.17.576 1.783l-3.225 3.14.76 4.441c.145.851-.745 1.503-1.488 1.123L10 15.347l-3.98 2.092c-.743.38-1.633-.272-1.488-1.123l.76-4.441L2.09 9.364c-.622-.613-.278-1.659.576-1.783l4.458-.649 1.681-4.048z" clipRule="evenodd" />
    </svg>
);
