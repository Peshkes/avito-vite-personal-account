type Props = {
    size: number;
    color?: string;
};

const Logo = ({ size, color }: Props) => (
    <svg
        id="Layer_2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 206.03 181.88"
        width={size}
        height={size}
        fill={color}
    >
        <g id="Layer_1-2">
            <g>
                <path className="cls-1"
                      d="m69.1,126.97c-1.71,3.1-1.67,6.89.1,9.92,1.82,3.12,5.05,4.97,8.65,4.97.03,0,.05,0,.08,0,3.63-.03,6.87-1.93,8.66-5.1l37.59-66.82c1.77-3.14,1.74-6.87-.07-9.98-1.82-3.11-5.05-4.97-8.65-4.97h-.89c-3.65,0-7.01,1.98-8.77,5.17l-36.69,66.8Z" />
                <path className="cls-1"
                      d="m185.16,6.81C173.76.11,158.14,0,158.02,0h-49.44c-8.26,0-15.93,4.47-20.01,11.65l-26.41,46.57c-1.26,2.22-3.53,3.55-6.09,3.55h-.04c-2.57-.01-4.84-1.37-6.09-3.61L21.53,6.71C19.24,2.57,14.88,0,10.15,0,6.51,0,3.23,1.88,1.4,5.03c-1.84,3.15-1.86,6.92-.07,10.09l47.77,84.55c1.44,2.54,4.03,4.06,6.95,4.06,2.93.02,5.52-1.5,6.96-4.04L104.37,27.14c2.16-3.8,6.23-6.08,10.59-6.06l42.9-.04c.36-.03,13.88.07,21.4,7.57,5.82,5.81,6.77,12.36,6.77,23.39,0,10.06-.77,15.92-6.24,21.37-7.53,7.51-17.4,7.56-17.77,7.56h-7.49c-8.06,0-16.91,5.36-21.06,12.74l-41.51,70.82c-2.25,4-2.21,8.95.11,12.91,1.63,2.8,4.54,4.47,7.78,4.47h.07c3.27-.02,6.18-1.74,7.78-4.59l40.71-69.18c1.97-3.5,6.79-7.11,11.46-7.11h2.16c.11,0,11.75-.1,23.17-6.45,15.15-8.43,20.83-21.42,20.83-42.55,0-22.39-5.69-36.27-20.87-45.19Z" />
            </g>
        </g>
    </svg>
);

export default Logo;
