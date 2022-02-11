public class Main {
    /*
        Validation rules:
        4 octets, 3 periods: X . X . X . X
        First character of octet cannot be '0'.
        Each octet must be between 1 and 255 inclusive.
    */
    public static boolean isValidIPv4(String address) {
        String[] splitAddress = address.split("\\.");

        if(splitAddress.length != 4)
            return false;

        for(int i = 0; i < splitAddress.length; i++) {
            if(splitAddress[i].charAt(0) == '0')
                return false;

            int asInt = Integer.parseInt(splitAddress[i]);
            if(asInt < 1 || asInt > 255) {
                return false;
            }
        }

        return true;
    }

    public static void main(String[] args) {
        System.out.println("IPv4: \"1.2.3.4\", isValid: " + isValidIPv4("1.2.3.4"));
        System.out.println("IPv4: \"1.2.3\", isValid: " + isValidIPv4("1.2.3"));
        System.out.println("IPv4: \"1.2.3.4.5\", isValid: " + isValidIPv4("1.2.3.4.5"));
        System.out.println("IPv4: \"123.45.67.89\", isValid: " + isValidIPv4("123.45.67.89"));
        System.out.println("IPv4: \"123.456.78.90\", isValid: " + isValidIPv4("123.456.78.90"));
        System.out.println("IPv4: \"123.045.067.089\", isValid: " + isValidIPv4("123.045.067.089"));
    }
}
