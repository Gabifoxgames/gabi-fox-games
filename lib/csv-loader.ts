export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  stock?: number;
}

/**
 * Parse CSV data from Google Sheets
 * Expected CSV format:
 * id,name,description,price,image,category,stock
 */
export async function parseCSV(csvText: string): Promise<Product[]> {
  const lines = csvText.trim().split('\n');
  
  if (lines.length < 2) {
    console.error('CSV file is empty or has no data');
    return [];
  }

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const products: Product[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',').map(v => v.trim());
    const product: Product = {
      id: values[headers.indexOf('id')] || `product-${i}`,
      name: values[headers.indexOf('name')] || 'Unknown',
      description: values[headers.indexOf('description')] || '',
      price: parseFloat(values[headers.indexOf('price')] || '0'),
      image: values[headers.indexOf('image')] || '/placeholder.png',
      category: values[headers.indexOf('category')] || 'Games',
      stock: parseInt(values[headers.indexOf('stock')] || '0'),
    };

    products.push(product);
  }

  return products;
}

/**
 * Fetch CSV from Google Sheets
 * URL format: https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv
 */
export async function fetchProductsFromSheets(sheetUrl: string): Promise<Product[]> {
  try {
    const response = await fetch(sheetUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }

    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error('Error fetching products from Google Sheets:', error);
    return [];
  }
}

/**
 * Sample products for development/fallback
 */
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Pixel Adventure',
    description: 'A retro pixel-art adventure game',
    price: 9.99,
    image: 'https://via.placeholder.com/300x400?text=Pixel+Adventure',
    category: 'Action',
    stock: 100,
  },
  {
    id: '2',
    name: 'Space Shooter',
    description: 'Intense space shooting action',
    price: 14.99,
    image: 'https://via.placeholder.com/300x400?text=Space+Shooter',
    category: 'Shooter',
    stock: 50,
  },
  {
    id: '3',
    name: 'Puzzle Master',
    description: 'Mind-bending puzzle challenges',
    price: 7.99,
    image: 'https://via.placeholder.com/300x400?text=Puzzle+Master',
    category: 'Puzzle',
    stock: 75,
  },
];
