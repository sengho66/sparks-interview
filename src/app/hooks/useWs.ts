"use client";
import { useEffect, useRef, useState } from "react";
type Pairs = "BTC/USDT" | "ETH/USDT" | "USD";

interface Message {
  channel: string;
  type: string;
  data: Response[];
}

export interface Response {
  symbol: string;
  bid: number;
  bid_qty: number;
  ask: number;
  ask_qty: number;
  last: number;
  volume: number;
  vwap: number;
  low: number;
  high: number;
  change: number;
  change_pct: number;
}

const getPairs = (symbol: string) => {
  if (symbol === "ETH/USDT") {
    return "ethUSDT";
  }

  if (symbol === "BTC/USDT") {
    return "btcUSDT";
  }
};

export const useWs = (pairs: Pairs[]) => {
  const [btc, setBtc] = useState<Response>();
  const [eth, setEth] = useState<Response>();
  const [connected, setConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    const socket = new WebSocket("wss://ws.kraken.com/v2");
    ws.current = socket;
    const pingInterval = setInterval(() => {
      socket.send(JSON.stringify({ method: "ping" }));
    }, 2000);
    socket.onopen = () => {
      setConnected(true);
      socket.send(
        JSON.stringify({
          method: "subscribe",
          params: {
            channel: "ticker",
            symbol: pairs,
          },
        })
      );
    };

    socket.onmessage = (msg) => {
      const message: Message = JSON.parse(msg.data);
      if (message.channel === "ticker") {
        const res = message.data[0];
        const symbol = getPairs(res.symbol);
        if (symbol === "btcUSDT") {
          setBtc(res);
        }

        if (symbol === "ethUSDT") {
          setEth(res);
        }
      }
    };
    ws.current.onclose = () => {
      setConnected(false);
      socket.close();
    };

    return () => {
      clearInterval(pingInterval);
      socket.close();
    };
  }, []);

  return { btc, eth, connected };
};
