import {fetchMenu, fetchProductsById } from '@/lib';
import { NextResponse } from 'next/server';

import { type NextRequest } from 'next/server'


export async function GET(request: NextRequest) {
  try {
    
    const searchParams = request.nextUrl.searchParams
    const categoryId = searchParams.get('categoryId')
    // Get the URL from the request
    console.log('categoryId',categoryId)
    if(categoryId) {
      const mealsByCategory = await fetchProductsById(categoryId)
    
      return NextResponse.json(mealsByCategory, { status: 200 });
    }
    // Pass the parameter to fetchMenu
    const meals = await fetchMenu()
    
    return NextResponse.json(meals, { status: 200 });
  } catch (error) {
    console.error('Error fetching meals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meals' },
      { status: 500 }
    );
  }
}
