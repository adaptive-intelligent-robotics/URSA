#!/bin/bash

# Check if file argument is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <video_file>"
    echo "Example: $0 trimmed_video.mp4"
    exit 1
fi

INPUT_FILE="$1"

# Check if input file exists
if [ ! -f "$INPUT_FILE" ]; then
    echo "Error: File '$INPUT_FILE' not found!"
    exit 1
fi

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "Error: ffmpeg is not installed or not in PATH"
    exit 1
fi

# Create temporary output file
TEMP_FILE="${INPUT_FILE%.*}_temp.${INPUT_FILE##*.}"

echo "Processing '$INPUT_FILE'..."
echo "Removing metadata and re-encoding..."

# Remove all metadata and re-encode
if ffmpeg -i "$INPUT_FILE" -map_metadata -1 -c:v libx264 -c:a aac "$TEMP_FILE" -y; then
    echo "Re-encoding successful!"
    
    # Replace original file with the new one
    mv "$TEMP_FILE" "$INPUT_FILE"
    echo "File '$INPUT_FILE' has been updated successfully!"
else
    echo "Error: ffmpeg failed to process the file"
    # Clean up temporary file if it exists
    [ -f "$TEMP_FILE" ] && rm "$TEMP_FILE"
    exit 1
fi
