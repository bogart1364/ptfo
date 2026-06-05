#!/usr/bin/env python3
from PyPDF2 import PdfReader, PdfWriter
import os

# Define chapter boundaries (you can adjust these)
chapters = [
    {"name": "Chapter_1_Creating_Gmail_and_X_Account", "start": 0, "end": None},
    {"name": "Chapter_2_Entering_Crypto_Twitter", "start": 0, "end": None},
    {"name": "Chapter_3_Content_Creation_with_GPT", "start": 0, "end": None},
    {"name": "Chapter_4_Engagement_and_Network", "start": 0, "end": None},
    {"name": "Chapter_5_Account_Growth", "start": 0, "end": None},
    {"name": "Chapter_6_Security_and_Asset", "start": 0, "end": None},
    {"name": "Chapter_7_Web3_Projects", "start": 0, "end": None},
]

pdf_path = "zero web3 eng ver.pdf"
output_dir = "chapters"

try:
    # Open the PDF
    reader = PdfReader(pdf_path)
    total_pages = len(reader.pages)
    print(f"Total Pages: {total_pages}")
    
    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # Calculate pages per chapter
    pages_per_chapter = total_pages // len(chapters)
    
    print(f"Splitting PDF into {len(chapters)} chapters...")
    print(f"Approximately {pages_per_chapter} pages per chapter\n")
    
    # Split PDF by chapters
    for i, chapter in enumerate(chapters):
        start_page = i * pages_per_chapter
        if i == len(chapters) - 1:
            # Last chapter gets remaining pages
            end_page = total_pages
        else:
            end_page = (i + 1) * pages_per_chapter
        
        # Create a new PDF writer
        writer = PdfWriter()
        
        # Add pages to the new PDF
        for page_num in range(start_page, end_page):
            if page_num < total_pages:
                writer.add_page(reader.pages[page_num])
        
        # Save the chapter
        output_path = os.path.join(output_dir, f"{chapter['name']}.pdf")
        with open(output_path, 'wb') as output_file:
            writer.write(output_file)
        
        print(f"✓ {chapter['name']}.pdf (pages {start_page + 1}-{end_page})")
    
    print(f"\n✅ Successfully split PDF into chapters in '{output_dir}' folder!")

except Exception as e:
    print(f"Error: {e}")
    print("Make sure PyPDF2 is installed: pip install PyPDF2")
