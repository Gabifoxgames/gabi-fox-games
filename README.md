# Gabi Fox Games - E-Commerce Store

A modern, responsive game e-commerce store built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

✨ **Modern Design**
- Orange and black color scheme
- Sora font throughout
- Responsive mobile-first design
- Smooth animations and transitions

🛒 **Shopping Experience**
- Product catalog with categories
- Add to cart functionality
- Shopping cart modal with quantity controls
- Real-time cart updates
- Stock availability tracking

📊 **Google Sheets Integration**
- Automatic product import from Google Sheets CSV
- Easy product management
- No database needed
- Real-time updates

⚡ **Performance**
- Next.js 14 with App Router
- Tailwind CSS for optimized styling
- Zustand for state management
- Optimized for Vercel deployment

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Deployment**: Vercel

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Gabifoxgames/gabi-fox-games.git
cd gabi-fox-games

# Install dependencies
npm install

# Create .env.local file
touch .env.local
```

### Setup Google Sheets

1. **Create a Google Sheet** with the following columns:
   ```
   id | name | description | price | image | category | stock
   ```

2. **Add your products** to the spreadsheet

3. **Share the sheet** publicly (view access only)

4. **Get your Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
   ```

5. **Add to `.env.local`**:
   ```
   NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv
   ```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
gabi-fox-games/
├── app/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Home page with product catalog
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Header with logo and cart
│   ├── ProductCard.tsx     # Product card component
│   └── Cart.tsx            # Shopping cart modal
├── lib/
│   ├── cart-store.ts       # Zustand cart state management
│   └── csv-loader.ts       # Google Sheets CSV parser
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv
```

## Color Scheme

- **Primary**: Orange (#f97316)
- **Secondary**: Black (#000000)
- **Accent**: White (#ffffff)

## Deployment on Vercel

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel settings
4. Deploy!

```bash
npm run build
npm start
```

## Features Breakdown

### Product Catalog
- Display products in a responsive grid
- Show product details (name, description, price, category, stock)
- Product images with hover effects
- Low stock warnings

### Shopping Cart
- Add products with custom quantities
- View cart total price
- Modify quantities or remove items
- Cart badge shows item count
- Persistent cart state (uses browser state)

### Header
- Logo with branding
- Navigation
- Shopping cart button with badge
- Sticky positioning

## Sample Products

The store comes with sample products. To use your own:

1. Create a Google Sheet
2. Add the columns as specified above
3. Share publicly
4. Add the CSV export URL to `.env.local`

## Customization

### Change Brand Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: { /* your colors */ }
}
```

### Change Font
Edit `app/globals.css` to import different Google Fonts

### Update Logo
Edit the logo in `components/Header.tsx`

## API Reference

### `cart-store.ts`
- `addItem(item)` - Add product to cart
- `removeItem(id)` - Remove product from cart
- `updateQuantity(id, quantity)` - Update product quantity
- `clearCart()` - Empty the cart
- `getTotal()` - Get cart total
- `getItemCount()` - Get total items count

### `csv-loader.ts`
- `parseCSV(csvText)` - Parse CSV string to products
- `fetchProductsFromSheets(url)` - Fetch and parse Google Sheets CSV
- `SAMPLE_PRODUCTS` - Sample product data

## Troubleshooting

### Products not loading
- Check that Google Sheet is publicly shared
- Verify the CSV export URL is correct
- Check browser console for errors
- Ensure the sheet has correct column names

### Cart not persisting
- Currently uses browser state (can be extended to localStorage)
- Clear browser cache if issues occur

### Styling issues
- Run `npm run build` to regenerate CSS
- Clear `.next` folder and rebuild
- Verify Tailwind configuration

## Future Enhancements

- [ ] Persistent cart (localStorage)
- [ ] Product search and filtering
- [ ] Product detail pages
- [ ] Wishlist functionality
- [ ] User authentication
- [ ] Payment integration (Stripe/PayPal)
- [ ] Order management
- [ ] Admin dashboard
- [ ] Product reviews and ratings

## License

MIT License - feel free to use this project for personal or commercial use.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Google Sheets setup instructions
3. Check browser console for errors
4. Open an issue on GitHub

## Credits

Built with ❤️ by Gabi Fox Games

---

**Ready to launch your store?** Deploy to Vercel with one click! 🚀
