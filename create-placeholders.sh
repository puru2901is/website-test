#!/bin/bash

# Create directory if it doesn't exist
mkdir -p images

# Download placeholder images for projects
curl -o images/project1.jpg https://images.unsplash.com/photo-1677442135072-d2d576b13234 
curl -o images/project2.jpg https://images.unsplash.com/photo-1673476675583-25b567155ed5
curl -o images/project3.jpg https://images.unsplash.com/photo-1686920740206-c5f648bce116

# Download a placeholder profile image
curl -o images/profile.jpg https://images.unsplash.com/photo-1568585105565-e372ea66c8fa

echo "Placeholder images have been downloaded to the images folder."