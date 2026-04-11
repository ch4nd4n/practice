import argparse
import logging
import sys
from pathlib import Path

import ollama

logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)

DEFAULT_MODEL = "gemma3:latest"
DEFAULT_INSTRUCTIONS = (
    "Analyze the following document and provide a concise summary, "
    "key points, and any notable insights."
)

CLEAN_MD_INSTRUCTIONS = (
    "Format this markdown document: improve spacing and syntax, fix spelling errors as: corrected [original]. "
    "Keep all content and structure unchanged. Return only the formatted markdown."
)


def process_markdown(input_md, model, instructions, output=None):
    """
    Process a markdown file with Ollama using custom instructions.

    Args:
        input_md (str): Path to the input markdown file.
        model (str): Ollama model name to use.
        instructions (str): System prompt / instructions for the model.
        output (str, optional): Path to the output file. If None, prints to stdout.
    """
    try:
        md_path = Path(input_md)
        if not md_path.exists():
            logger.error(f"Error: Markdown file '{input_md}' not found.")
            return

        with open(md_path, "r", encoding="utf-8") as f:
            content = f.read()

        logger.info(f"Processing with model: {model}")
        logger.info(f"Instructions: {instructions[:60]}...")
        logger.info("")

        messages = [
            {"role": "system", "content": instructions},
            {"role": "user", "content": content},
        ]

        response_text = ""
        response = ollama.chat(model=model, messages=messages, stream=True)
        for chunk in response:
            token = chunk["message"]["content"]
            response_text += token
            sys.stdout.write(token)
            sys.stdout.flush()

        sys.stdout.write("\n")

        if output:
            output_path = Path(output)
            with open(output_path, "w", encoding="utf-8") as f:
                f.write(response_text)
            logger.info(f"\nOutput saved to '{output}'")

    except FileNotFoundError:
        logger.error(f"Error: Input file '{input_md}' not found.")
    except ollama.ResponseError as e:
        logger.error(f"Ollama error: {e}")
    except Exception as e:
        logger.error(f"An error occurred: {e}")


def main():
    parser = argparse.ArgumentParser(
        description="Process markdown files with Ollama LLM models."
    )
    parser.add_argument("input_md", help="Path to the input markdown file.")
    parser.add_argument(
        "-m",
        "--model",
        default=DEFAULT_MODEL,
        help=f"Ollama model to use (default: {DEFAULT_MODEL}).",
    )
    parser.add_argument(
        "-i",
        "--instructions",
        default=CLEAN_MD_INSTRUCTIONS,
        help="System instructions/prompt for the model.",
    )
    parser.add_argument(
        "-o",
        "--output",
        default=None,
        help="Optional output file path. If not provided, output goes to stdout.",
    )

    args = parser.parse_args()

    process_markdown(args.input_md, args.model, args.instructions, args.output)


if __name__ == "__main__":
    main()
