import { Document } from "@/typing/document";
import { Dictionary } from "@/typing/generics";
import { User } from "@/typing/user";
import { Purchase, PurchasePrepaymentPayload } from "@/typing/purchase";

export const documentMapper = {
  fromBackend (document: Dictionary): Document {
    return {
      id: document.id,
      title: document.title,
      organization: document.organization,
      department: document.department,
      description: document.description,
      text: document.text,
      price: document.price
    };
  },

  toBackend (document: Document): Dictionary {
    return {
      id: document.id,
      title: document.title,
      organization: document.organization,
      department: document.department,
      description: document.description,
      text: document.text,
      price: document.price
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
      active: !!user.active,
      role: user.role
    };
  },

  toBackend (user: User): Dictionary {
    const data: Dictionary = {
      id: user.id,
      email: user.email,
      name: user.name,
      activated_at: user.activatedAt,
      active: !!user.active,
      role: user.role
    };

    if (user.password) {
      data.password = user.password;
    }

    if (user.confirmation) {
      data.confirmation = user.confirmation;
    }

    return data;
  }
};

export const purchaseMapper = {
  fromBackend (purchase: Dictionary): Purchase {
    return {
      id: purchase.id,
      purchasedAt: purchase.purchased_at,
      validUntil: purchase.valid_until,
      downloadUrl: purchase.download_url,
      documentId: purchase.document_id,
      userId: purchase.user_id,
      paymentStatus: purchase.payment_status
    };
  },

  toBackend (purchase: Purchase): Dictionary {
    return {
      id: purchase.id,
      purchased_at: purchase.purchasedAt,
      valid_until: purchase.validUntil,
      download_url: purchase.downloadUrl,
      document_id: purchase.documentId,
      user_id: purchase.userId,
      payment_status: purchase.paymentStatus
    };
  }
};

export const prepurchaseMapper = {
  fromBackend (pre: Dictionary): PurchasePrepaymentPayload {
    return {
      documentId: pre.document_id,
      amount: pre.amount,
      currency: pre.currency,
      paymentMethod: pre.payment_method
    };
  },

  toBackend (pre: PurchasePrepaymentPayload): Dictionary {
    return {
      document_id: pre.documentId,
      amount: pre.amount,
      currency: pre.currency,
      payment_method: pre.paymentMethod
    };
  }
};
