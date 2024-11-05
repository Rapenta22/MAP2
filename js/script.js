$(document).ready(function () {
  console.log("jQuery is ready");

  const chart = Highcharts.chart('chart', {
    title: {
      text: '10월의 수면시간',
      align: 'center',
      margin: 40
    },
    xAxis: {
      categories: ['일', '월', '화', '수', '목', '금', '토']
    },
    yAxis: {
      title: {
        text: '수면 시간'
      },
      labels: {
        formatter: function() {
          const hours = Math.floor(this.value / 100);
          return `${hours}시간`;
        }
      },
      tickPositions: [400, 600, 800, 1000],
      min: 600,
      max: 900
    },
    tooltip: {
      formatter: function() {
        const hours = Math.floor(this.point.y / 100);
        const minutes = this.point.y % 100;
        return `<b>${this.series.name}</b><br>${this.x}: ${hours}시간 ${minutes > 0 ? minutes + '분' : ''}`;
      }
    },
    plotOptions: {
      column: {
        colorByPoint: false,
        color: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#8170DF'],
            [1, '#240E52']
          ]
        },
        borderRadius: 5
      }
    },
    series: [{
      type: 'column',
      name: '수면시간',
      data: [],
      showInLegend: false
    }]
  });

  // 주차 버튼 클릭 이벤트
  $(".week-btn, .week-btn-1, .week-btn-edge").on("click", function () {
    console.log("Button clicked");

    $(".week-btn, .week-btn-1, .week-btn-edge").removeClass("selected");
    $(this).addClass("selected");

    // 주차에 따른 데이터 설정
    let weekNumber = $(this).data("week");
    let data, titleText;

    switch (weekNumber) {
      case 1:
        data = [932, 905, 712, 612, 545, 740, 830];
        titleText = '10월의 1주차 수면시간';
        break;
      case 2:
        data = [812, 845, 742, 554, 530, 900, 745];
        titleText = '10월의 2주차 수면시간';
        break;
      case 3:
        data = [824, 831, 720, 624, 554, 832, 924];
        titleText = '10월의 3주차 수면시간';
        break;
      case 4:
        data = [810, 833, 852, 612, 533, 912, 942];
        titleText = '10월의 4주차 수면시간';
        break;
      case 5:
        data = [752, 812, 753, 634, 512, 812, 853];
        titleText = '10월의 5주차 수면시간';
        break;
      default:
        data = [0,0,0,0,0,0,0];
        titleText = '10월 수면시간';
    }

    let totalMinutes = data.reduce((acc, time) => {
      const hours = Math.floor(time / 100);
      const minutes = time % 100;
      return acc + (hours * 60) + minutes;
    }, 0);
    let averageMinutes = Math.round(totalMinutes / data.length);
    const averageHours = Math.floor(averageMinutes / 60);
    const averageRemainingMinutes = averageMinutes % 60;

    $(".chart-text").text(`"${weekNumber}주차"는 평균 ${averageHours}시간 ${averageRemainingMinutes > 0 ? averageRemainingMinutes + '분' : ''} 잤구나!`);

    chart.update({
      title: {
        text: titleText
      },
      series: [{
        data: data
      }]
    });
  });
});
