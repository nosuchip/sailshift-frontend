import { Document } from "@/typing/document";
import { Dictionary } from "@/typing/generics";
import { User } from "@/typing/user";
import { Purchase } from "@/typing/purchase";

export const documentMapper = {
  fromBackend (document: Dictionary): Document {
    return {
      id: document.id,
      title: document.title,
      organization: document.organization,
      description: document.description,
      text: document.text
    };
  },

  toBackend (document: Document): Dictionary {
    return {
      id: document.id,
      title: document.title,
      organization: document.organization,
      description: document.description,
      text: document.text
    };
  }
};

export const userMapper = {
  fromBackend (user: Dictionary): User {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      activatedAt: user.activated_at,
      role: user.role
    };
  },

  toBackend (user: User): Dictionary {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      activated_at: user.activatedAt,
      role: user.role
    };
  }
};

export const purchaseMapper = {
  fromBackend (purchase: Dictionary): Purchase {
    return {
      id: purchase.id,
      purchasedAt: purchase.purchased_at,
      validUntil: purchase.valid_until,
      downloadUrl: purchase.download_url
    };
  },

  toBackend (purchase: Purchase): Dictionary {
    return {
      id: purchase.id,
      purchased_at: purchase.purchasedAt,
      valid_until: purchase.validUntil,
      download_url: purchase.downloadUrl
    };
  }
};
