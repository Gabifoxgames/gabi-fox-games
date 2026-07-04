'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product, fetchProductsFromSheets, SAMPLE_PRODUCTS } from '@/lib/csv-loader';

export default function Home() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Replace with your Google Sheets CSV export URL
        // Format: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv
        const SHEET_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

        if (SHEET_URL) {
          const fetchedProducts = await fetchProductsFromSheets(SHEET_URL);
          if (fetchedProducts.length > 0) {
            setProducts(fetchedProducts);
          }
        }
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load products. Using sample products.');
        // Keep using SAMPLE_PRODUCTS on error
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-black font-sora mb-4">
          Welcome to <span className="text-orange-600">Gabi Fox Games</span>
        </h2>
        <p className="text-lg text-gray-600 font-sora">
          Discover amazing games for every mood and skill level
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8 rounded">
          <p className="font-sora">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
            <p className="text-gray-600 font-sora">Loading games...</p>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 font-sora text-lg">No games available at the moment.</p>
        </div>
      )}

      {/* Setup Instructions */}
      <div className="mt-16 bg-orange-50 border-2 border-orange-200 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-black font-sora mb-4">📊 Setup Google Sheets</h3>
        <p className="text-gray-700 mb-4">To use your own product catalog:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Create a Google Sheet with columns: <code className="bg-white px-2 py-1 rounded">id, name, description, price, image, category, stock</code></li>
          <li>Share the sheet publicly (view access)</li>
          <li>Get the sheet ID from the URL</li>
          <li>Create a <code className="bg-white px-2 py-1 rounded">.env.local</code> file with: <code className="bg-white px-2 py-1 rounded">NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv</code></li>
          <li>Restart the dev server</li>
        </ol>
      </div>
    </div>
  );
}
