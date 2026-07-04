import React, { useState, useRef, useEffect } from 'react';
import { X, Edit2, Check, X as XIcon } from 'lucide-react';
import type { Product } from '../../../lib/api/services/products';
import { formatCurrency } from '../../../lib/utils';
import bottleImg from '../../../assets/bottel_img.png';

interface SelectedProductsProps {
  products: Product[];
  onRemove: (productId: string) => void;
  onUpdateCustomPrice?: (
    productId: string,
    customPrice: number | undefined
  ) => void;
}

export function SelectedProducts({
  products,
  onRemove,
  onUpdateCustomPrice,
}: SelectedProductsProps) {
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image';
  };

  const handleEditPrice = (product: Product, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setEditingPrice(product.product_id.toString());
    setTempPrice(
      product.custom_price?.toString() || product.product_price.toString()
    );
  };

  const handleSavePrice = (productId: string) => {
    const price = parseFloat(tempPrice);
    if (!isNaN(price) && price >= 0) {
      onUpdateCustomPrice?.(productId, price);
    }
    setEditingPrice(null);
    setTempPrice('');
  };

  const handleCancelEdit = () => {
    setEditingPrice(null);
    setTempPrice('');
  };

  const handleKeyPress = (e: React.KeyboardEvent, productId: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSavePrice(productId);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  useEffect(() => {
    if (editingPrice && inputRef.current) {
      const scrollY = window.scrollY;
      inputRef.current.focus();
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 0);
    }
  }, [editingPrice]);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-700">Selected Products</h3>
      {products.map((product) => {
        const isEditing = editingPrice === product.product_id.toString();
        const displayPrice = product.custom_price ?? product.product_price;
        const hasCustomPrice = product.custom_price !== undefined;
        const quantity = product.quantity || 1;
        const lineTotal = displayPrice * quantity;

        return (
          <div
            key={product.product_id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={product.product_img?.[0]?.img_video || bottleImg}
                alt={product.product_name}
                className="w-16 h-16 object-cover rounded bg-gray-100"
                onError={handleImageError}
              />
              <div className="flex-1">
                <h3 className="font-medium">{product.product_name}</h3>
                <p className="text-sm text-gray-500">SKU: {product.product_sku}</p>
                <div className="flex items-center space-x-2">
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Price: $</span>
                      <input
                        ref={inputRef}
                        type="number"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(e.target.value)}
                        onKeyDown={(e) =>
                          handleKeyPress(e, product.product_id.toString())
                        }
                        onBlur={() =>
                          handleSavePrice(product.product_id.toString())
                        }
                        className="w-20 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        step="0.01"
                      />
                      <button
                        onClick={() =>
                          handleSavePrice(product.product_id.toString())
                        }
                        className="p-1 text-green-600 hover:text-green-700"
                        type="button"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-1 text-red-600 hover:text-red-700"
                        type="button"
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <p
                        className={`text-sm font-medium ${
                          hasCustomPrice ? 'text-blue-600' : ''
                        }`}
                      >
                        {formatCurrency(displayPrice)}
                      </p>
                      {hasCustomPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatCurrency(product.product_price)}
                        </span>
                      )}
                      <button
                        onClick={(e) => handleEditPrice(product, e)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Edit price"
                        type="button"
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">Quantity: {quantity}</p>
                <p className="text-xs text-gray-600 font-semibold">
                  Line total: {formatCurrency(lineTotal)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onRemove(product.product_id.toString())}
              className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
