import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public class ContiguousMedian {
    private List<Integer> elements;

    public ContiguousMedian() {
        elements = new LinkedList<>();
    }

    private int calculateMedian() {
        boolean oddElements = (elements.size() + 2) % 2 == 1;

        if(oddElements) {
            return elements.get(elements.size() / 2);
        } else {
            return (elements.get(elements.size() / 2 - 1) + elements.get(elements.size() / 2)) / 2;
        }
    }

    // Insertion sort, returns median so far
    public int addElement(int element) {
        for(int i = 0; i <= elements.size(); i++) {
            if(i == elements.size()) {
                elements.add(element);
                break;
            } else if(elements.get(i) >= element) {
                elements.add(i, element);
                break;
            }
        }

        return calculateMedian();
    }
}
