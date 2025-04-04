import { SVGProps } from 'react'
const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={7} height={7} viewBox="0 0 7 7" fill="none" {...props}>
    <path
      stroke={props.fill || '#EA637B'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m1 1 5 5m0-5L1 6"
    />
  </svg>
)
export default XIcon
