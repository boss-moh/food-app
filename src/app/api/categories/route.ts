import { fetchCategories } from '@/lib';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = await fetchCategories()
    
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
