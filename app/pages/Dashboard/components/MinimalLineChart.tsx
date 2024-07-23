import { Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"

type MinimalLineChartProps = {
    labels: string[]
    hidePointsAtIndex: number[]
    data: any
    width: number
    height: number
}

export const MinimalLineChart = ({labels, hidePointsAtIndex ,data, width, height}: MinimalLineChartProps) => {
    return (
        <LineChart
                        data={{
                            labels: labels,
                            datasets: [data]
                        }}
                        width={width}
                        height={height} 
                        chartConfig={{
                            backgroundGradientFrom: "#ffffff",
                            backgroundGradientTo: "#ffffff",
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 1,
                            },
                            propsForDots:{
                                r: "6",
                            }
                        }}
                        withHorizontalLabels={false}
                        withVerticalLabels={false}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            paddingRight: 0
                        }}
                        hidePointsAtIndex={hidePointsAtIndex}
                    />
    )
}