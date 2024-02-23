export function IsValidURL(url: string) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    return urlRegex.test(url);
}