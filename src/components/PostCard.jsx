import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {

  const imageUrl = featuredImage ? appwriteService.getFileView(featuredImage) : null;

    console.log("PostCard Rendering URL:", imageUrl);

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {imageUrl ? (
                        <img 
                            src={imageUrl} 
                            alt={title} 
                            className='rounded-xl object-cover h-48 w-full' 
                        />
                    ) : (
                        <div className='w-full h-48 bg-gray-300 rounded-xl flex items-center justify-center'>
                            <span className='text-gray-500'>No Image Available</span>
                        </div>
                    )}
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard;