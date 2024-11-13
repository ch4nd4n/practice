# https://github.com/unclecode/crawl4ai
# pip install crawl4ai
# to run this use something like 
# python3 crawl.py > test.md
#

import asyncio
from crawl4ai import AsyncWebCrawler

# cur_url = "https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0"
cur_url = "https://www.chandankumar.com"
async def main():
    async with AsyncWebCrawler(verbose=True) as crawler:
        result = await crawler.arun(url=cur_url)
        print(result.markdown)

if __name__ == "__main__":
    asyncio.run(main())
