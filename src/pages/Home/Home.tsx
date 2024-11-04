import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MultipleWinners } from './MultipleWinners/MultipleWinners'
import { StudiosWinners } from './StudiosWinners/StudiosWinners'
import { Text } from '@/components/Text'
import { IntervalAwardsProducers } from './IntervalAwardsProducers/IntervalAwardsProducers'
import { WinnersByYear } from './WinnersByYear/WinnersByYear'

export const Home = () => {
  const { bottom } = useSafeAreaInsets()

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 10 + bottom,
      }}
      style={{ backgroundColor: '#fff' }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text style={{ paddingLeft: 16, fontSize: 18 }} fow={600}>
          🏆 Anos com múltiplos vencedores
        </Text>
        <MultipleWinners />
      </View>
      <View>
        <Text style={{ paddingLeft: 16, fontSize: 18 }} fow={600}>
          🎬 Top 3 estúdios premiados
        </Text>
        <StudiosWinners />
      </View>
      <View>
        <Text style={{ paddingLeft: 16, fontSize: 18 }} fow={600}>
          🗓️ Intervalos entre premiações
        </Text>
        <Text style={{ paddingLeft: 16, paddingTop: 10, fontSize: 16 }} fow={400}>
          Maior
        </Text>
        <IntervalAwardsProducers type="max" />
        <Text style={{ paddingLeft: 16, fontSize: 16 }} fow={400}>
          Menor
        </Text>
        <IntervalAwardsProducers type="min" />
      </View>
      <View>
        <Text style={{ paddingLeft: 16, fontSize: 18 }} fow={600}>
          🎥 Filmes vencedores por ano
        </Text>
        <WinnersByYear />
      </View>
    </ScrollView>
  )
}
