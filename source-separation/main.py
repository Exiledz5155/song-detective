import os
import argparse
from pathlib import Path
import demucs.separate

def separate_audio(input_file, output_dir, model="htdemucs", two_stems=None):
    # Convert to absolute path
    output_dir = os.path.abspath(output_dir)
    
    # Check that output exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Args for demucs.separate.main
    args = ["--out", output_dir, "-n", model]
    
    if two_stems:
        args.extend(["--two-stems", two_stems])
    
    args.append(input_file)
    
    # Run the model
    demucs.separate.main(args)
    
    print(f"Separation complete. Stems saved in {output_dir}")

def main():
    parser = argparse.ArgumentParser(description="Separate audio using Demucs")
    parser.add_argument("input_file", type=str, help="Path to the input audio file")
    parser.add_argument("--output_dir", type=str, default="output", help="Directory to save the separated stems")
    parser.add_argument("--model", type=str, default="htdemucs", help="Demucs model to use")
    parser.add_argument("--two-stems", type=str, choices=["vocals", "drums", "bass", "other"], help="Separate into two stems")
    
    args = parser.parse_args()
    
    input_path = Path(args.input_file)
    output_dir = Path(args.output_dir)
    
    if not input_path.exists():
        print(f"Error: Input file '{input_path}' does not exist.")
        return
    
    separate_audio(str(input_path), str(output_dir), args.model, args.two_stems)

if __name__ == "__main__":
    main()

"""
Sample Usage 

cd to models first*

python main.py "C:/Users/Exiledz/Desktop/Project Dump/Song Detective Tests Files/EXILEDZ - Rain Dance Master01.mp3" --output_dir "C:/Users/Exiledz/Desktop/output"

"""