import prisma from '@/lib/prisma';
import type { Review } from '@/lib/types';

export async function getAllReviews(): Promise<Review[]> {
  return await prisma.review.findMany({
    orderBy: {
      read: 'desc'
    }
  });
}
