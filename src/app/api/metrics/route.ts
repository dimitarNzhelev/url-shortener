import { NextResponse } from 'next/server';
import client from 'prom-client';

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

export async function GET() {
  const metrics = await register.metrics();
  const headers = new Headers();
  headers.set("Content-Type", register.contentType);
  
  return new NextResponse(metrics, { headers });
}
