public class Vec2f {
    public int x, y;

    public Vec2f(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("{");
        sb.append("x:").append(x);
        sb.append(", y:").append(y);
        sb.append('}');
        return sb.toString();
    }
}
