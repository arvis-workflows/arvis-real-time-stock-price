const arvish = require("@jopemachine/arvish");

const apiToken = process.env.token;

arvish
  .fetch(
    `https://cloud.iexapis.com/v1/stock/${
      arvish.input
    }/quote?token=${apiToken.trim()}`
  )
  .then((result) => {
    const percentage = (result.changePercent * 100).toFixed(2);
    const week52Low = result.week52Low.toFixed(2);
    const week52High = result.week52High.toFixed(2);
    const extendedChange = (result.extendedChangePercent * 100).toFixed(2);
    let emoji = "📈";

    if (percentage < 0) {
      emoji = "📉";
    }

    const items = [
      {
        title:
          result.symbol +
          ": " +
          result.latestPrice +
          " | Change: " +
          percentage +
          "%" +
          emoji,
        subtitle:
          "Extended Change Percent:" +
          extendedChange +
          "% | 52 Week Low/High: " +
          week52Low +
          " - " +
          week52High,
      },
    ];
    arvish.output(items);
  })
  .catch((err) => {
    arvish.error("Stock Is " + err.statusMessage);
  });
