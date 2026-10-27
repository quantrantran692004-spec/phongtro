import { apiClient } from './apiClient';

export interface UploadResult {
  url: string;
  filename: string;
  size: number;
}

export class UploadService {
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

  /**
   * Validate file before processing
   */
  validateFile(file: File): { valid: boolean; error?: string } {
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: 'Định dạng ảnh không hỗ trợ. Vui lòng chọn JPG, PNG hoặc WEBP.',
      };
    }

    if (file.size > this.MAX_FILE_SIZE) {
      return {
        valid: false,
        error: 'Dung lượng ảnh vượt quá giới hạn 5MB.',
      };
    }

    return { valid: true };
  }

  /**
   * Convert file to base64 for instant preview or offline mock storage
   */
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Upload single image
   */
  async uploadImage(file: File): Promise<UploadResult> {
    const validation = this.validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    if (!apiClient.isMockEnabled) {
      const formData = new FormData();
      formData.append('file', file);

      const res = await apiClient.post<UploadResult>('/upload', formData);
      if (res.success && res.data) {
        return res.data;
      }
      throw new Error(res.error || 'Tải ảnh lên máy chủ thất bại');
    }

    // Mock Base64 upload for instant responsiveness
    const base64 = await this.fileToBase64(file);
    return {
      url: base64,
      filename: file.name,
      size: file.size,
    };
  }

  /**
   * Batch upload multiple images
   */
  async uploadMultiple(files: File[]): Promise<UploadResult[]> {
    return Promise.all(files.map((file) => this.uploadImage(file)));
  }
}

export const uploadService = new UploadService();
