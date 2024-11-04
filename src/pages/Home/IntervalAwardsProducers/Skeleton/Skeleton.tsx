import ContentLoader from 'react-content-loader/native'
import { useWindowDimensions } from 'react-native'

import { Rect } from 'react-native-svg'

export const Skeleton = () => {
  const { width, height } = useWindowDimensions()

  return (
    <ContentLoader
      testID="interval-awards-skeleton"
      speed={2}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#e1e1e1"
    >
      <Rect x={0} y={0} rx={5} ry={5} width={width - 30} height={100} />
    </ContentLoader>
  )
}
