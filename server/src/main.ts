import express from "express";

const PORT = process.env.PORT || 4000;
const app = express();

const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

function gracefullShutdown(signal: string) {
  process.on(signal, async () => {
    console.log("GoodBye, got the signal", signal);

    server.close;

    //disconnect from db

    console.log("My worker here is done");

    process.exit(0);
  });
}

for (let i = 0; i < signals.length; i++) {
  gracefullShutdown(signals[i]);
}
