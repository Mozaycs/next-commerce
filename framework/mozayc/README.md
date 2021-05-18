`Mozayc directory structure shoul look like this`

`mozayc`

- `auth`
  - use-login.tsx
  - use-logout.tsx
  - use-signup.tsx
- `cart`
  - use-add-item.tsx
  - use-cart.tsx
  - use-remove-item.tsx
  - use-update-item.tsx
- `common`
  - get-all-pages.ts
  - get-page.ts
  - get-site-info.ts
- `customer`
  - use-customer.tsx
- `product`
  - get-all-product-paths.ts
  - get-all-products.ts
  - use-search.tsx
- `wishlist`
  - use-add-item.tsx
  - use-remove-item.tsx
  - use-wishlist.tsx

`commerce`

- product
  - use-price.tsx

## Common in all pages

#### get site info

- mozayc
  - common
    - get-site-info.ts

this returns categories and brands

#### Get all products

- mozayc
  - product
    - get-all-products.ts

calling an api for getting all products array

#### Get all product paths

- mozayc
  - product
    - get-all-product-paths.ts

getting all paths of products.

#### Get all pages

- mozayc
  - common
    - get-all-pages.ts

getting all pages.

#### Get a page

- mozayc
  - common
    - get-page.ts

getting a single page

---

## Cart & wishlist page

## Cart

#### Use Cart

- mozayc
  - cart
    - use-cart.tsx

for getting cart data

#### Use add item in cart

- mozayc
  - cart
    - use-add-item.tsx

for adding item into cart

#### Use update item

- mozayc
  - cart
    - use-update-item.tsx

for update the cart items

#### Use remove item

- mozayc
  - cart
    - use-remove-item.tsx

for removing item from cart

---

### Wishlist

#### Use wishlist

- mozayc
  - wishlist
    - use-wishlist.tsx

returning items of wishlist

#### Use add item

- mozayc
  - wishlist
    - use-add-item.tsx

adding item in wishlist

#### Use remove item

- mozayc
  - wishlist
    - use-remove-item.tsx

removes item from wishlist

#### Use Customer

- mozayc
  - customer
    - use-customer.tsx

for getting user profile details

#### Use search

- mozayc
  - product
    - use-search.tsx

for searching or sorting

---

## Auth

#### Use login

- mozayc
  - auth
    - use-login.tsx

for user login

#### Use Logout

- mozayc
  - auth
    - use-logout.tsx

for logout user

#### Use signup

- mozayc
  - auth
    - use-signup.tsx

for user signup

---

#### Use price in commerce directory

- commerce
  - product
    - use-price.tsx

for calculating total & subtotal.
