# Project Title

Platform that allows users to buy, sell, or exchange rewards,  coupons, and cashback offers they receive from digital wallets. 

## Run Locally

Clone the project

```bash
  git clone https://github.com/dishafaujdar/coupons
```

Go to the project directory

```bash
  cd coupons
```

Install dependencies

```bash
  pnpm install
```

Setup Prisma ORM

```bash
In /clone/coupons/packages/db$ run
  i.  pnpm install
  ii. create .env 

  DATABASE_URL="postgresql://yourUserName:yourPassword@localhost:5432/yourdb"


# docker run postgres -e yourUserName -e yourPassword -e yourdb -p 5433:5433 -d postgres

# docker run -d \
#   -p 5432:5432 \
#   -e POSTGRES_USER= yourUserName \
#   -e POSTGRES_PASSWORD= yourPassword \
#   -e POSTGRES_DB= yourdb \
#   --name your_postgres \
#   postgres
```

Setup Backend

```bash
In /clone/coupons/apps/backend$ run
  i.  pnpm install
  ii. pnpm build / pnpm dev
```

Setup Frontend

```bash
In /clone/coupons/apps/frontend$ 
  i. pnpm install
  ii. pnpm run dev
```

In the root folder run

```bash
  pnpm build
  pnpm start
```