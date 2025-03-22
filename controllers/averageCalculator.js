const dotenv = require("dotenv");
dotenv.config();

let arr = [];
let oldarr = [];
let totalarr = [];
let windowSize = 5;

const numberGenerator = async (req, res) => {
  let response;
  let resp;
  if (req.params.val == "p") {
    response = await fetch("http://20.244.56.144/test/primes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.auth}`,
      },
    });
    resp = await response.json();
  } else if (req.params.val == "f") {
    response = await fetch("http://20.244.56.144/test/fibo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.auth}`,
      },
    });
    resp = await response.json();
  } else if (req.params.val == "r") {
    response = await fetch("http://20.244.56.144/test/rand", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.auth}`,
      },
    });
    resp = await response.json();
  } else {
    response = await fetch("http://20.244.56.144/test/even", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.auth}`,
      },
    });
    resp = await response.json();
  }

  console.log(resp);

  const index = Math.floor(Math.random() * resp.numbers.length);
  let newNum = resp.numbers[index];
  console.log(newNum);

  if (arr.includes(newNum)) {
    return await numberGenerator(req, res);
  }

  oldarr = [...arr];

  arr.push(newNum);
  totalarr.push(newNum);

  if (arr.length > windowSize) {
    arr.shift();
  }

  let sum = 0;

  for (j = 0; j < arr.length; j++) {
    sum += arr[j];
  }

  let avg = sum / arr.length;

  return res.json({
    windowPrevState: oldarr,
    windowCurrState: arr,
    numbers: totalarr,
    avg: avg,
  });
};

module.exports = { numberGenerator };
