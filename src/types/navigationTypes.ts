export type AppRoutes = '/' | '/dashboard' | `/match/${string}`
export type PathParams = {
  pathname: AppRoutes
}
export type TypedNavigate = (to: AppRoutes) => void
