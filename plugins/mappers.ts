import { Document } from '~/@typing/document';
import { Dictionary } from '~/@typing/generics';
import { User } from '~/@typing/user';
import { Purchase } from '~/@typing/purchase';

export const documentMapper = {
    fromBackend(document: Dictionary): Document {
        return {
            id: document.id,
            title: document.title,
            organization: document.organization,
            description: document.description,
            text: document.text
        };
    },

    toBackend(document: Document): Dictionary {
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
    fromBackend(user: Dictionary): User {
        return {
            email: user.email,
            name: user.name
        };
    },

    toBackend(user: User): Dictionary {
        return {
            email: user.email,
            name: user.name
        };
    }
};

export const purchaseMapper = {
    fromBackend(purchase: Dictionary): Purchase {
        return {
            id: purchase.id,
            purchasedAt: purchase.purchased_at,
            validUntil: purchase.valid_until,
            downloadUrl: purchase.download_url
        };
    },

    toBackend(purchase: Purchase): Dictionary {
        return {
            id: purchase.id,
            purchased_at: purchase.purchasedAt,
            valid_until: purchase.validUntil,
            download_url: purchase.downloadUrl
        };
    }
};
