import os
import argparse
from pathlib import Path
import demucs.separate
import subprocess
import shutil
import sys
import requests

def setup_drumsep():
    if not Path("drumsep").exists():
        subprocess.run(["git", "clone", "https://github.com/inagoy/drumsep.git"], shell=True)
    
    os.chdir("drumsep")
    
    # Run the equivalent of drumsepInstall
    if "demucs" not in subprocess.run([sys.executable, "-m", "pip", "list"], capture_output=True, text=True).stdout.lower():
        subprocess.run([sys.executable, "-m", "pip", "install", "demucs"], shell=True)
    
    if not Path("model").exists() or len(list(Path("model").glob("*"))) == 0:
        Path("model").mkdir(exist_ok=True)
        os.chdir("model")
        
        # Download the model file using requests
        url = "https://drive.google.com/uc?id=15zcoSMb1s3Lr-J7EauxGrmSyDgG8Bug"
        response = requests.get(url)
        if response.status_code == 200:
            with open("modelo_final", "wb") as f:
                f.write(response.content)
            print("Model downloaded successfully.")
        else:
            print(f"Failed to download model. Status code: {response.status_code}")
        
        os.chdir("..")
    
    os.chdir("..")

def separate_drums(input_file, output_dir):
    drum_file = Path(output_dir) / "htdemucs" / Path(input_file).stem / "drums.wav"
    if not drum_file.exists():
        raise FileNotFoundError(f"Drum file not found: {drum_file}")
    
    final_output_dir = Path(output_dir) / "drum_components"
    final_output_dir.mkdir(exist_ok=True)
    
    os.chdir("drumsep")
    cmd = [
        sys.executable, "-c",
        f"import demucs.separate; demucs.separate.main(['--repo', 'model', '-o', '{final_output_dir.as_posix()}', '-n', 'modelo_final', '{drum_file.as_posix()}'])"
    ]
    subprocess.run(cmd, shell=True)
    os.chdir("..")

def separate_audio(input_file, output_dir, model="htdemucs", two_stems=None):
    output_dir = Path(output_dir)
    output_dir.mkdir(exist_ok=True)
    
    args = ["--out", str(output_dir), "-n", model]
    if two_stems:
        args.extend(["--two-stems", two_stems])
    args.append(input_file)
    
    demucs.separate.main(args)
    
    print(f"Initial separation complete. Stems saved in {output_dir}")
    
    # Now separate the drums
    separate_drums(input_file, output_dir)
    
    print(f"Drum separation complete. Components saved in {output_dir}/drum_components")

def main():
    parser = argparse.ArgumentParser(description="Separate audio using Demucs and further separate drums")
    parser.add_argument("input_file", type=str, help="Path to the input audio file")
    parser.add_argument("--output_dir", type=str, default="output", help="Directory to save the separated stems")
    parser.add_argument("--model", type=str, default="htdemucs", help="Demucs model to use")
    parser.add_argument("--two-stems", type=str, choices=["vocals", "drums", "bass", "other"], help="Separate into two stems")
    
    args = parser.parse_args()
    
    input_path = Path(args.input_file)
    if not input_path.exists():
        print(f"Error: Input file '{input_path}' does not exist.")
        return
    
    setup_drumsep()
    separate_audio(str(input_path), args.output_dir, args.model, args.two_stems)

if __name__ == "__main__":
    main()