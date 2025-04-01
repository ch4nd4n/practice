import argparse
import asyncio
from crawl4ai import AsyncWebCrawler

async def fetch_markdown(url):
    """
    Asynchronously fetches the Markdown content from a given URL.

    Args:
        url (str): The URL of the HTML page to convert.

    Returns:
        str: The Markdown content of the page, or None if an error occurs.
    """
    try:
        async with AsyncWebCrawler(verbose=False) as crawler:
            result = await crawler.arun(url=url)
            return result.markdown
    except Exception as e:
        print(f"Error fetching or converting '{url}': {e}")
        return None

def main():
    """
    Main function to handle command-line arguments and initiate the conversion.
    """
    parser = argparse.ArgumentParser(description="Convert HTML from a URL to Markdown.")
    parser.add_argument("input_url", help="The URL of the HTML page to convert.")
    parser.add_argument("output_file", nargs='?', default="output.md",
                        help="Optional output file name (default: output.md).")

    args = parser.parse_args()

    async def run_conversion():
        markdown_content = await fetch_markdown(args.input_url)
        if markdown_content:
            try:
                with open(args.output_file, 'w', encoding='utf-8') as f:
                    f.write(markdown_content)
                print(f"Successfully converted '{args.input_url}' to '{args.output_file}'")
            except IOError as e:
                print(f"Error writing to output file '{args.output_file}': {e}")

    asyncio.run(run_conversion())

if __name__ == "__main__":
    main()