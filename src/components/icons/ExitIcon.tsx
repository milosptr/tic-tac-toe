import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={20} viewBox="0 0 14 20" fill="none" {...props}>
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} clipPath="url(#a)">
      <path d="M7 2.5a.937.937 0 1 1-1.875 0A.937.937 0 0 1 7 2.5ZM11.688 18.438l-2.813-3.75M3.25 18.438l1.875-3.75 2.813-2.813L7 6.25" />
      <path d="M12.625 10 10.75 7.187 7 6.25 4.187 9.063 1.376 10" />
    </g>
  </svg>
)
export default SvgComponent
