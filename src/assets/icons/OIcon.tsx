import { SVGProps } from 'react'
const OIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={7} height={7} viewBox="0 0 7 7" {...props} fill="none">
    <path stroke={props.fill || '#28C195'} strokeWidth={1.5} d="M6 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
  </svg>
)
export default OIcon
