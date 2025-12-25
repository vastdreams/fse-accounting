/**
 * Spend Tracking API (manual)
 *
 * Use this to record ad spend so the dashboard can compute CPL / CPQL.
 * In production, replace with platform integrations (Google Ads / LinkedIn).
 */

import { NextRequest, NextResponse } from 'next/server';
import { addSpendRecord, getSpendRecords } from '@/lib/leadStorage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const daysParam = searchParams.get('days');
    const days = daysParam ? parseInt(daysParam, 10) : 30;

    const records = getSpendRecords(days).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({
      success: true,
      data: {
        records,
        count: records.length,
      },
    });
  } catch (error) {
    console.error('Spend API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch spend records' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { source, campaign, amount, currency, notes, timestamp } = body || {};

    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { success: false, message: 'amount must be a positive number' },
        { status: 400 }
      );
    }

    const record = addSpendRecord({
      source,
      campaign,
      amount: parsedAmount,
      currency,
      notes,
      timestamp,
    });

    return NextResponse.json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error('Spend API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add spend record' },
      { status: 500 }
    );
  }
}


