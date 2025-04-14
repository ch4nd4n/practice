import argparse
import os
from pdfminer.high_level import extract_text

def pdf_to_markdown(input_pdf, output_md="out.md"):
    """
    Converts a PDF file to Markdown.

    Args:
        input_pdf (str): Path to the input PDF file.
        output_md (str, optional): Path to the output Markdown file.
                                   Defaults to "out.md".
    """
    try:
        with open(input_pdf, 'rb') as pdf_file:
            text = extract_text(pdf_file)

        with open(output_md, 'w', encoding='utf-8') as md_file:
            md_file.write(text)

        print(f"Successfully converted '{input_pdf}' to '{output_md}'")

    except FileNotFoundError:
        print(f"Error: Input PDF file '{input_pdf}' not found.")
    except Exception as e:
        print(f"An error occurred during conversion: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert PDF files to Markdown.")
    parser.add_argument("input_pdf", help="Path to the input PDF file.")
    parser.add_argument("output_md", nargs='?', default="out.md",
                        help="Optional path to the output Markdown file (default: out.md).")

    args = parser.parse_args()

    pdf_to_markdown(args.input_pdf, args.output_md)