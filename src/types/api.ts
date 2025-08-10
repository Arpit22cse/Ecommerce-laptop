import axios from "axios";
import { Laptop } from './index'

const API_BASE_URL = "http://localhost:3000";

export const authApi = {

    login: async(data:any)=>{
        
        try {
            const email = data.email;
            const password = data.password
            const response = await axios.post(`${API_BASE_URL}/login`,
                { email, password  },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: true, message: error instanceof Error ? error.message : 'Unknown error' };
        }
    },

    signup: async(data:any)=>{
        
        try {
            const response = await axios.post(`${API_BASE_URL}/signup`,
                { data },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: true, message: error instanceof Error ? error.message : 'Unknown error' };
        }
    },

    me: async(data:any)=>{
        
    }

}

export const adminApi = {
    addLaptop: async(laptop: Laptop, images?: File[]) => {
        try {
            const formData = new FormData();
            
            // Append laptop data as JSON string
            formData.append('name', laptop.name);
            formData.append('brand', laptop.brand);
            formData.append('processor', laptop.processor);
            formData.append('ram', laptop.ram);
            formData.append('storage', laptop.storage);
            formData.append('graphics', laptop.graphics);
            formData.append('display', laptop.display);
            formData.append('price', laptop.price.toString());
            if (laptop.originalPrice) {
                formData.append('originalPrice', laptop.originalPrice.toString());
            }
            formData.append('description', laptop.description || '');
            formData.append('rating', laptop.rating.toString());
            formData.append('reviews', laptop.reviews.toString());
            formData.append('features', JSON.stringify(laptop.features || []));
            
            // Append images
            if (images && images.length > 0) {
                images.forEach((image) => {
                    formData.append('images', image);
                });
            }
            
            const response = await axios.post(`${API_BASE_URL}/admin/laptops`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error adding laptop:', error);
            return { error: true, message: error instanceof Error ? error.message : 'Unknown error' };
        }
    }
}

export const customerApi = {

    getLaptop: async (id: string) => {
        try {
            const response = await axios.get(`/api/customers/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: true, message: error instanceof Error ? error.message : 'Unknown error' };
        }
    }

}