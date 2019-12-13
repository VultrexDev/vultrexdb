"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VultrexError extends Error {
    constructor(error, name = null) {
        super();
        this.name = name || "VultrexError";
        this.message = error;
    }
}
exports.default = VultrexError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVnVsdHJleEVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1Z1bHRyZXhFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQXFCLFlBQWEsU0FBUSxLQUFLO0lBQzlDLFlBQW1CLEtBQWEsRUFBRSxPQUFlLElBQUk7UUFDcEQsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxjQUFjLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztDQUNEO0FBTkQsK0JBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBWdWx0cmV4RXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcblx0cHVibGljIGNvbnN0cnVjdG9yKGVycm9yOiBzdHJpbmcsIG5hbWU6IHN0cmluZyA9IG51bGwpIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lIHx8IFwiVnVsdHJleEVycm9yXCI7XHJcblx0XHR0aGlzLm1lc3NhZ2UgPSBlcnJvcjtcclxuXHR9XHJcbn0iXX0=