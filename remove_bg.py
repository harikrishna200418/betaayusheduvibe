from PIL import Image
import os

def remove_white_bg(input_path, output_path, tolerance=30):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Check if pixel is white or very close to white
            if item[0] > 255 - tolerance and item[1] > 255 - tolerance and item[2] > 255 - tolerance:
                newData.append((255, 255, 255, 0))  # Transparent
            else:
                newData.append(item)
        
        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully processed {input_path} and saved to {output_path}")
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    input_file = r"d:\ayush-eduvibe123\ayush-eduvibe\assets\final_logo.png"
    output_file = r"d:\ayush-eduvibe123\ayush-eduvibe\assets\final_logo_transparent.png"
    
    if os.path.exists(input_file):
        remove_white_bg(input_file, output_file)
    else:
        print(f"Input file not found: {input_file}")
