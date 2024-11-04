import ContentLoader from 'react-content-loader/native'
import { useWindowDimensions } from 'react-native'

import { Rect } from 'react-native-svg'

export const Skeleton = () => {
  const { width, height } = useWindowDimensions()

  return (
    <ContentLoader
      testID="movie-list-skeleton"
      speed={2}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#e1e1e1"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <Rect
          key={index}
          x={12}
          y={0 + index * 110}
          rx={5}
          ry={5}
          width={width - 24}
          height={100}
        />
      ))}
    </ContentLoader>
  )
}
