const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3001;

// Enable CORS for all origins
app.use(cors({ origin: '*' }));

app.use(express.json());

app.get('/data', async (req, res) => {
  try {
    const response = await axios.get('https://services.niftytrader.in/webapi/symbol/nifty50-data', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Authorization': 'Basic bmlmdHlhcGl1c2VyOm5pZnR5YXBpdXNlckAyMTEwIw==',
        'Connection': 'keep-alive',
        'Origin': 'https://www.niftytrader.in',
        'Referer': 'https://www.niftytrader.in/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
      },
    });

    res.json(response.data.result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
